module "fe-react" {
  source = "./tf_ecs_react"

  // Service Variables
  # path_pattern = "/"
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
    { name = "PORT",
    value = var.container_port }
  ]
  ecs_cluster_id        = module.ecs.ecs_cluster_id
  ecs_sg_id             = module.ecs.ecs_sg_id
  environment           = var.environment
  health_check_path     = var.health_check_path
  name                  = var.name
  private_subnets       = module.vpc.public_subnets
  scion_npc_gen_alb_arn = module.alb.scion_npc_gen_alb_arn
  vpc_id                = module.vpc.vpc_id
}
