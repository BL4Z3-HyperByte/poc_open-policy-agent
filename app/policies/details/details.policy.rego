package details

import rego.v1

default allow := false

user_is_authorized if {
	input.user.role == "power"
}

allow if {
	user_is_authorized
}
