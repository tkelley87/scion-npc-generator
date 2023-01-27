resource "aws_ecs_cluster" "scion-npc-gen" {
  name = "${var.name}-cluster-${var.environment}"
}


# resource "aws_iam_policy" "dynamodb" {
#   name        = "${var.name}-task-policy-dynamodb"
#   description = "Policy that allows access to DynamoDB"

#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#       {
#           "Effect": "Allow",
#           "Action": [
#               "dynamodb:CreateTable",
#               "dynamodb:UpdateTimeToLive",
#               "dynamodb:PutItem",
#               "dynamodb:DescribeTable",
#               "dynamodb:ListTables",
#               "dynamodb:DeleteItem",
#               "dynamodb:GetItem",
#               "dynamodb:Scan",
#               "dynamodb:Query",
#               "dynamodb:UpdateItem",
#               "dynamodb:UpdateTable"
#           ],
#           "Resource": "*"
#       }
#   ]
# }
# EOF
# }

# resource "aws_iam_role_policy_attachment" "ecs-task-role-policy-attachment" {
#   role       = aws_iam_role.ecs_task_role.name
#   policy_arn = aws_iam_policy.dynamodb.arn
# }
