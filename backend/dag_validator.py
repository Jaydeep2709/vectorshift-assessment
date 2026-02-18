"""
dag_validator.py

Validates if pipeline is DAG and returns execution order.
"""

from collections import defaultdict, deque


class DAGValidator:

    def validate(self, nodes, edges):

        graph = defaultdict(list)
        in_degree = {node["id"]: 0 for node in nodes}

        # Build graph
        for edge in edges:

            source = edge["source"]
            target = edge["target"]

            graph[source].append(target)
            in_degree[target] += 1

        # Topological sort (Kahn's algorithm)
        queue = deque()

        for node_id in in_degree:
            if in_degree[node_id] == 0:
                queue.append(node_id)

        execution_order = []

        while queue:

            node = queue.popleft()
            execution_order.append(node)

            for neighbor in graph[node]:

                in_degree[neighbor] -= 1

                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        is_dag = len(execution_order) == len(nodes)

        return is_dag, execution_order
