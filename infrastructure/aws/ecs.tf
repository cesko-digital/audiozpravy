data "aws_caller_identity" "current" {}

resource "aws_kms_key" "ecs_cluster_key" {
  description             = "example"
  deletion_window_in_days = 7
}

resource "aws_cloudwatch_log_group" "audiozpravy_ecs_cluster" {
  name = "audiozpravy-cluster"
}

resource "aws_ecs_cluster" "audiozpravy_ecs_cluster" {
  name = "audiozpravy-cluster"

  configuration {
    execute_command_configuration {
      kms_key_id = aws_kms_key.ecs_cluster_key.arn
      logging    = "OVERRIDE"

      log_configuration {
        cloud_watch_encryption_enabled = true
        cloud_watch_log_group_name     = aws_cloudwatch_log_group.audiozpravy_ecs_cluster.name
      }
    }
  }
}



resource "aws_ecs_task_definition" "backend" {
  family = "backend"
  network_mode = "awsvpc"
  requires_compatibilities = [ "FARGATE" ]
  execution_role_arn = aws_iam_role.ecs_backend_task_execution_role.arn
  task_role_arn = aws_iam_role.ecs_backend_task_role.arn
  cpu       = "256"
  memory    = "512"
  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${aws_ecr_repository.audiozpravy_backend.repository_url}:latest"
      essential = true
      environment = [
                {
                    name = "LOCAL_DEV",
                    value = "1"
                }
            ]
      logConfiguration = {
                logDriver = "awslogs",
                options   = {
                    awslogs-group: aws_cloudwatch_log_group.audiozpravy_ecs_cluster.name,
                    awslogs-region: var.aws-region,
                    awslogs-stream-prefix: "backend"
                }
      }
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 5000
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "backend" {
  name            = "backend"
  cluster         = aws_ecs_cluster.audiozpravy_ecs_cluster.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  scheduling_strategy                = "REPLICA"
  #iam_role        = aws_iam_role.ecs_backend_task_role.arn

  network_configuration {
   #security_groups  = var.ecs_service_security_groups
   subnets          = [ aws_subnet.public.id ]
   assign_public_ip = true
  }

}

resource "aws_iam_role" "ecs_backend_task_execution_role" {
  name = "backend_task_exec_role"
 
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_role" "ecs_backend_task_role" {
  name = "backend_task_role"
 
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}
 
resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_backend_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "task_s3" {
  role       = "${aws_iam_role.ecs_backend_task_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}
