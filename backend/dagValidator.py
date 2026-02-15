from collections import defaultdict, deque


class DAGValidator:

    def __init__(self, nodes, edges):
        self.nodes = nodes
        self.edges = edges

        self.node_ids = set()
        self.graph = defaultdict(list)
        self.in_degree = defaultdict(int)

    # Step 1: Validate basic structure
    def validate_structure(self):

        if not isinstance(self.nodes, list):
            return False, "Nodes must be a list"

        if not isinstance(self.edges, list):
            return False, "Edges must be a list"

        for node in self.nodes:

            if "id" not in node:
                return False, "Node missing id"

            node_id = node["id"]

            if node_id in self.node_ids:
                return False, f"Duplicate node id: {node_id}"

            self.node_ids.add(node_id)

        return True, None


    # Step 2: Build graph
    def build_graph(self):

        for node_id in self.node_ids:
            self.in_degree[node_id] = 0

        for edge in self.edges:

            if "source" not in edge or "target" not in edge:
                return False, "Edge must have source and target"

            source = edge["source"]
            target = edge["target"]

            if source not in self.node_ids:
                return False, f"Invalid source node: {source}"

            if target not in self.node_ids:
                return False, f"Invalid target node: {target}"

            self.graph[source].append(target)
            self.in_degree[target] += 1

        return True, None


    # Step 3: Topological Sort
    def topological_sort(self):

        queue = deque()

        for node_id in self.node_ids:
            if self.in_degree[node_id] == 0:
                queue.append(node_id)

        order = []

        while queue:

            current = queue.popleft()
            order.append(current)

            for neighbor in self.graph[current]:

                self.in_degree[neighbor] -= 1

                if self.in_degree[neighbor] == 0:
                    queue.append(neighbor)

        if len(order) != len(self.node_ids):
            return False, "Cycle detected", None

        return True, None, order


    # Main validation function
    def validate(self):

        ok, error = self.validate_structure()
        if not ok:
            return {
                "valid": False,
                "error": error
            }

        ok, error = self.build_graph()
        if not ok:
            return {
                "valid": False,
                "error": error
            }

        ok, error, order = self.topological_sort()
        if not ok:
            return {
                "valid": False,
                "error": error
            }

        return {
            "valid": True,
            "order": order
        }
