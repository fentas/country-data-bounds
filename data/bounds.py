

from country_bounding_boxes import (
      country_subunits_containing_point,
      country_subunits_by_iso_code
    )
import sys, json

if len(sys.argv) < 2:
    sys.exit('Usage: %s ISO-CODE' % sys.argv[0])

print ( json.dumps({ 'subunits': [c.name for c in country_subunits_by_iso_code(sys.argv[1])], 'bounds': [c.bbox for c in country_subunits_by_iso_code(sys.argv[1])]}) )
