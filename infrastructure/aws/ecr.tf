resource "aws_ecr_repository" "audiozpravy_backend" {
  name                 = "audiozpravy-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "audiozpravy_pipeline" {
  name                 = "audiozpravy-pipeline"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
