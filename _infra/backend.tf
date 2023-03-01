terraform {
  backend "s3" {
    bucket         = "tkelley-tf-states-us-west-2"
    key            = "scion-npc-gen.tfstate"
    encrypt        = true
    kms_key_id     = "alias/tk-dev"
    dynamodb_table = "terraform-state"
    region         = "us-west-2"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.33.0"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_secretsmanager_secret" "scion" {
  name = "${var.environment}/scion"
}

data "aws_secretsmanager_secret_version" "current" {
  secret_id = data.aws_secretsmanager_secret.scion.id
}
