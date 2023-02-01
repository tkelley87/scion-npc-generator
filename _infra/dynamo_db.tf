resource "aws_dynamodb_table" "scion_npc_gen" {
  name           = "NpcGen"
  billing_mode   = "PROVISIONED"
  read_capacity  = "10"
  write_capacity = "10"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  hash_key = "id"
}
