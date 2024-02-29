package details

import rego.v1

default allow := false

fields contains ["id", "name", "price", "description", "edit_link"] if {
	input.user_role == "power"
}

fields contains ["id", "name", "price", "description"] if {
	input.user_role == "user"
}

fields contains ["id", "name", "description"] if {
	input.user_role == "guest"
}
