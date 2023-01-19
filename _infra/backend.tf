
terraform {
  backend "s3" {
    bucket         = "scion-npc-gen-tf-states-us-east-1"
    key            = "state/terraform.tfstate"
    encrypt        = true
    kms_key_id     = "alias/terraform-bucket-key"
    dynamodb_table = "terraform-state"
    region         = var.region
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

resource "aws_instance" "test_instance" {
  ami           = "ami-0b5eea76982371e91"
  instance_type = "t2.micro"
  tags = {
    Name = "test_instance"
  }
}

# data "terraform_remote_state" "infra" {
#   backend = "s3"
#   config = {
#     bucket         = "scion-npc-gen-tf-states-us-east-1"
#     key            = "state/terraform.tfstate"
#     encrypt        = true
#     kms_key_id     = "alias/terraform-bucket-key"
#     dynamodb_table = "terraform-state"
#     region         = var.region
#   }
# }
