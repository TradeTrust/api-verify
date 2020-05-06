export const ropstenDocument = {
  schema: "tradetrust/v1.0",
  data: {
    $template: {
      type: "a22525f2-c523-42df-8a56-4f0812ad8010:string:EMBEDDED_RENDERER",
      name: "138fa824-9471-4436-9295-541cb814b056:string:BILL_OF_LADING",
      url: "ca81cac8-b9b7-4d62-b3f4-a8b4c0bb2b5a:string:https://demo-cnm.openattestation.com"
    },
    issuers: [
      {
        identityProof: {
          type: "289549c7-b35a-4ecb-9eab-816a41af994f:string:DNS-TXT",
          location: "77856d10-5025-45b9-8ff0-759c6985da05:string:demo-tradetrust.openattestation.com"
        },
        name: "9c0f4c13-0273-46d9-912a-47b50ce878ce:string:DEMO STORE",
        tokenRegistry: "029f83bc-3c7d-4971-b29b-9f687d603d28:string:0xc3E9eBc6aDA9BA4B4Ce65D71901Cb2307e9670cE"
      }
    ],
    consignee: {},
    notifyParty: {},
    shipper: {
      address: {}
    },
    name: "8b86529c-d0ff-4b89-b452-14503bf6fcd5:string:Maersk Bill of Lading",
    blNumber: "0cbeed9f-0483-447d-b861-96dfc1aa8009:string:0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e"
  },
  privacy: {
    obfuscatedData: []
  },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "b5f493626197f19e9064938ae3a669aaa9a6f10acdeb299ab41e8db7a460359b",
    proof: [],
    merkleRoot: "b5f493626197f19e9064938ae3a669aaa9a6f10acdeb299ab41e8db7a460359b"
  }
};

export const ropstenResponse = {
  summary: {
    all: true,
    documentStatus: true,
    documentIntegrity: true,
    issuerIdentity: true
  },
  data: [
    {
      type: "DOCUMENT_INTEGRITY",
      name: "OpenAttestationHash",
      data: true,
      status: "VALID"
    },
    {
      status: "SKIPPED",
      type: "DOCUMENT_STATUS",
      name: "OpenAttestationEthereumDocumentStoreIssued",
      reason: {
        code: 4,
        codeString: "SKIPPED",
        message:
          'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method'
      }
    },
    {
      name: "OpenAttestationEthereumTokenRegistryMinted",
      type: "DOCUMENT_STATUS",
      data: {
        mintedOnAll: true,
        details: [
          {
            minted: true,
            address: "0xc3E9eBc6aDA9BA4B4Ce65D71901Cb2307e9670cE"
          }
        ]
      },
      status: "VALID"
    },
    {
      status: "SKIPPED",
      type: "DOCUMENT_STATUS",
      name: "OpenAttestationEthereumDocumentStoreRevoked",
      reason: {
        code: 4,
        codeString: "SKIPPED",
        message:
          'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method'
      }
    },
    {
      name: "OpenAttestationDnsTxt",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "VALID",
          location: "demo-tradetrust.openattestation.com",
          value: "0xc3E9eBc6aDA9BA4B4Ce65D71901Cb2307e9670cE"
        }
      ],
      status: "VALID"
    }
  ]
};
