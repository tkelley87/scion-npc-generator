
resource "aws_ecs_cluster" "scion-npc-gen" {
  name = "scion-npc-gen" # Naming the cluster
}

# resource "aws_ecs_service" "scion-npc-gen-client" {
#  name                               = "${var.name}-service-${var.environment}"
#  cluster                            = aws_ecs_cluster.scion-npc-gen.id
#  task_definition                    = aws_ecs_task_definition.scion-npc-gen.arn
#  desired_count                      = 2
#  deployment_minimum_healthy_percent = 50
#  deployment_maximum_percent         = 200
#  launch_type                        = "FARGATE"
#  scheduling_strategy                = "REPLICA"

#  network_configuration {
#    security_groups  = var.ecs_service_security_groups
#    subnets          = var.subnets.*.id
#    assign_public_ip = false
#  }

#  load_balancer {
#    target_group_arn = var.aws_alb_target_group_arn
#    container_name   = "${var.name}-container-${var.environment}"
#    container_port   = var.container_port
#  }

#  lifecycle {
#    ignore_changes = [task_definition, desired_count]
#  }
# }