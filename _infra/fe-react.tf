module "fe-react" {
  source = "./tf_ecs_react"

  // Service Variables
  path_pattern = "/v1/"

  ecs_cluster_id = module.ecs.ecs_cluster_id
  environment    = var.environment
  name           = var.name
  vpc_id         = module.vpc.vpc_id
}
