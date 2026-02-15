from dagValidator import DAGValidator

nodes = [
    {"id": "1", "type": "input"},
    {"id": "2", "type": "llm"},
    {"id": "3", "type": "output"}
]

edges = [
    {"source": "1", "target": "2"},
    {"source": "2", "target": "3"}
]

validator = DAGValidator(nodes, edges)

result = validator.validate()

print(result)
