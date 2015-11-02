all:
	node data/normalize_csv.js name < country-data/data/countries.csv > data/countries.csv.new
	mv data/countries.csv.new data/countries.csv

	node data/country_csv_to_json.js  > data/countries.json
