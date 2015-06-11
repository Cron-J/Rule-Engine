var myExpression = 
//is equivalent to subconditions
[
    {
        "allany": "all",
        "conditions": [
            {
                "value": "123",
                "operator": "equalTo",
                "key": "supplierId"
            },
            {
                "value": "Samsung",
                "operator": "equalTo",
                "key": "mfgProductName"
            },
            {
                "value": "24000",
                "operator": "greaterThan",
                "key": "prices"
            },
            {
                "value": "yahoo",
                "operator": "notEqualTo",
                "key": "keywords"
            }
        ],
        "subconditions": [
            {
                "allany": "any",
                "conditions": [
                    {
                        "value": "91",
                        "operator": "greaterThan",
                        "key": "statusId"
                    },
                    {
                        "value": "shouldnotbe",
                        "operator": "notEqualTo",
                        "key": "manufacturerName"
                    }
                ],
                "subconditions": [
                    {
                        "allany": "all",
                        "conditions": [
                            {
                                "value": "true",
                                "operator": "equalTo",
                                "key": "isStocked"
                            }
                        ],
                        "subconditions": []
                    }
                ]
            }
        ]
    }
]