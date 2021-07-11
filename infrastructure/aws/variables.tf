variable "aws-region" {
  type    = string
  default = "eu-central-1"
}

variable "codename" {
  type    = string
  default = "audiozpravy"
}

# Internal domain, its not visible publicly, but it should be domain we own
# to comply with best practices => it ensures the internal domain names are globally unique.
variable "codename-domain" {
  type    = string
  default = "audiozpravy.ceskodigital.net"
}

variable "database-username" {
  type    = string
  default = "audiozpravydevelopment"
}

variable "database-password" {
  type = string
}
