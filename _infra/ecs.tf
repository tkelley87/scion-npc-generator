module "ecs" {
  source = "./tf_aws_ecs"

  environment = var.environment
  name        = var.name
  vpc_id      = module.vpc.vpc_id
}
