resource "aws_ecs_task_definition" "scion-npc-gen" {
  family                   = "${var.service_name}-task-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([{
    name : "${var.service_name}-container-${var.environment}"
    image : "${var.container_image}:latest"
    essential : true
    environment : var.container_environment
    portMappings : [{
      protocol : "tcp"
      containerPort : var.container_port
      hostPort : var.container_port
    }]
    networkMode : "awsvpc"
    logConfiguration : {
      logDriver : "awslogs"
      options : {
        "awslogs-create-group" : "true"
        "awslogs-group" : "${var.service_name}-container"
        "awslogs-stream-prefix" : "ecs"
        "awslogs-region" : "${var.region}"
      }
    }
    # environment : [
    #   for k, v in var.container_environment_variables : { name : k, value : v }
    # ]
    secrets : [
      for k, v in var.container_secret_environment_variables : { name : k, valueFrom : v }
    ]
  }])

  tags = {
    Name        = "${var.service_name}-task-${var.environment}"
    Environment = var.environment
  }
}
