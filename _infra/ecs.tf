module "ecs" {
  source = "./tf_aws_ecs"
  vpc_id = module.vpc.vpc_id
}

# module "ecs" {
#   source                      = "./tf_aws_ecs"
#   cidr                        = module.vpc.vpc_cidr
#   name                        = var.name
#   environment                 = var.environment
#   region                      = var.region
#   subnets                     = module.vpc.private_subnets
#   aws_alb_target_group_arn    = module.alb.aws_alb_target_group_arn
#   ecs_service_security_groups = [module.security_groups.ecs_tasks]
#   container_port              = var.container_port
#   container_cpu               = var.container_cpu
#   container_image             = var.container_image
#   container_memory            = var.container_memory
#   service_desired_count       = var.service_desired_count
#   container_environment = [
#     { name = "LOG_LEVEL",
#     value = "DEBUG" },
#     { name = "PORT",
#     value = var.container_port }
#   ]

#   container_environment_variables = {

#   }

#   container_secret_environment_variables = {
#     DATABASE : "${data.aws_secretsmanager_secret.secrets_npc_gen.arn}:DATABASE::"
#     PORT : "${data.aws_secretsmanager_secret.secrets_npc_gen.arn}:PORT::"
#   }
# }
