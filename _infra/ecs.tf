module "ecs" {
  source = "./tf_aws_ecs"

  domain_name_internal = var.domain_name_internal
  environment          = var.environment
  name                 = var.name
  vpc_id               = module.vpc.vpc_id
}
