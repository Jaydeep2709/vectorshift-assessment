from dag_validator import DAGValidator

validator = DAGValidator()

nodes = [
    {"id": "1"},
    {"id": "2"},
    {"id": "3"}
]

edges = [
    {"source": "1", "target": "2"},
    {"source": "2", "target": "3"}
]

is_dag, order = validator.validate(nodes, edges)

print("Is DAG:", is_dag)
print("Order:", order)
