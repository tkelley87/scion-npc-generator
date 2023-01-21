module "security_groups" {
  source      = "./tf_aws_sgs"
  name        = var.name
  vpc_id      = module.vpc.id
  environment = var.environment
  # container_port = var.container_port
}
