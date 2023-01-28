module "fe-react" {
  source = "./tf_ecs_react"

  // Service Variables
  path_pattern = "/v1/"

  ecs_cluster_id        = module.ecs.ecs_cluster_id
  environment           = var.environment
  health_check_path     = var.health_check_path
  name                  = var.name
  private_subnets       = var.private_subnets
  scion_npc_gen_alb_arn = module.alb.scion_npc_gen_alb_arn
  vpc_id                = module.vpc.vpc_id
}
