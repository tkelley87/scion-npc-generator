# Test
# Test

terraform {
  backend "s3" {
    bucket         = "scion-npc-gen-tf-states-us-east-1"
    key            = "state/test.terraform.tfstate"
    encrypt        = true
    kms_key_id     = "alias/scion-npc-gen-tf-states-us-east-1-bucket-key"
    dynamodb_table = "terraform-state"
    region         = "us-east-1"
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
