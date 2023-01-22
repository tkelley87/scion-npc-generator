module "ecs" {
  source                      = "./tf_aws_ecs"
  name                        = var.name
  environment                 = var.environment
  region                      = var.region
  subnets                     = module.vpc.private_subnets
  aws_alb_target_group_arn    = module.alb.aws_alb_target_group_arn
  ecs_service_security_groups = [module.security_groups.ecs_tasks]
  container_port              = var.container_port
  container_cpu               = var.container_cpu
  container_memory            = var.container_memory
  service_desired_count       = var.service_desired_count
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
    { name = "PORT",
    value = var.container_port }
  ]
  container_secrets      = module.secrets.secrets_map
  container_secrets_arns = module.secrets.application_secrets_arn
}
