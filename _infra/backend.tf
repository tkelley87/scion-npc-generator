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