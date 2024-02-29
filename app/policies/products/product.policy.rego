package products

import data.products.allow

import rego.v1

power if {
	input.user == "power"
}

normal if {
	input.user == "user"
}

guest if {
	input.user == "guest"
}
