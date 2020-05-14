# OpenAttestation Function

## Verify

The function invokes [@govtechsg/oa-verify](https://github.com/Open-Attestation/oa-verify) library and returns the result of the verifications performed on the provided document.

To get more information, please refer to:

- [ADR about OpenAttestation verifications](https://github.com/Open-Attestation/adr/blob/master/verifier.md): The ADR explains in details the whole process for the verification as well as the different terms used.
- [@govtechsg/oa-verify](https://github.com/Open-Attestation/oa-verify): Implementation of OpenAttestation verifier ADR.

### Usage

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '<OA_DOCUMENT_HERE>' \
  https://verify.tradetrust.io/
```

### Response

- `summary` is an object containing the verification for each fragment types as well as the consolidated result.
  - `summary.all` is a boolean indicating whether the document is valid for all fragment types.
  - `summary.documentStatus` is a boolean indicating whether the document is valid for fragment with `DOCUMENT_STATUS` type.
  - `summary.documentIntegrity` is a boolean indicating whether the document is valid for fragment with `DOCUMENT_INTEGRITY` type.
  - `summary.issuerIdentity` is a boolean indicating whether the document is valid for fragment with `ISSUER_IDENTITY` type.
- `data` is an array containing the fragments returned by all the verifiers that ran over the provided document.

Example:

```json
{
    "summary": {
        "all": true,
        "documentStatus": true,
        "documentIntegrity": true,
        "issuerIdentity": true
    },
    "data": [
        {
            "type": "DOCUMENT_INTEGRITY",
            "name": "OpenAttestationHash",
            "data": true,
            "status": "VALID"
        },
        {
            "name": "OpenAttestationEthereumDocumentStoreIssued",
            "type": "DOCUMENT_STATUS",
            "data": {
                "issuedOnAll": true,
                "details": [
                    {
                        "issued": true,
                        "address": "0x6d71da10Ae0e5B73d0565E2De46741231Eb247C7"
                    }
                ]
            },
            "status": "VALID"
        },
        {
            "status": "SKIPPED",
            "type": "DOCUMENT_STATUS",
            "name": "OpenAttestationEthereumTokenRegistryMinted",
            "reason": {
                "code": 4,
                "codeString": "SKIPPED",
                "message": "Document issuers doesn't have \"tokenRegistry\" property or TOKEN_REGISTRY method"
            }
        },
        {
            "name": "OpenAttestationEthereumDocumentStoreRevoked",
            "type": "DOCUMENT_STATUS",
            "data": {
                "revokedOnAny": false,
                "details": [
                    {
                        "revoked": false,
                        "address": "0x6d71da10Ae0e5B73d0565E2De46741231Eb247C7"
                    }
                ]
            },
            "status": "VALID"
        },
        {
            "name": "OpenAttestationDnsTxt",
            "type": "ISSUER_IDENTITY",
            "data": [
                {
                    "status": "VALID",
                    "location": "demo.tradetrust.io",
                    "value": "0x6d71da10Ae0e5B73d0565E2De46741231Eb247C7"
                }
            ],
            "status": "VALID"
        }
    ]
}
```

# Development

Copy `.env` from a co-worker or insert own credentials to get started. A copy of the .env file is available at `.env.example`

```
npm run dev
```

To run local tests against dynamodb-local, run commands

`npm run dev` to start the local database

`npm run integration:local` to run the tests

