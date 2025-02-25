export const abiPoolNative = [
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "canJoinPool_",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "poolPrice_",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "commissionPercentage_",
				"type": "uint8"
			},
			{
				"internalType": "address payable",
				"name": "withdrawAddress_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "enrollStartTime_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playEndTime_",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "paid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "AmountPaidInvalid",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ClaimExpiryTimeNotReached",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ClaimPhaseOver",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CommissionAlreadyClaimed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CommissionPercentageTooHigh",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CommissionTransferFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EnrollmentPhaseInactive",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "InvalidProof",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MerkleRootCannotBeZero",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoCommissionToClaim",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoUnclaimedPrizes",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PlaytimeNotOver",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PlaytimeOver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "PoolIntakeAlreadySetTo",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PoolIntakeInactive",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PoolPriceCannotBeZero",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PrizeStructureInPlace",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PrizeStructureNotSet",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "PrizeTransferFailed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "RefundAlreadyClaimed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RefundAlreadyInactive",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "count",
				"type": "uint32"
			}
		],
		"name": "RefundCountNotZero",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RefundInPlace",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RefundInactive",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "RefundTransferFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UnclaimedPrizesTransferFailed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserAlreadyClaimed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UserAlreadyInPool",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserNotInPool",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "WithdrawAddressCannotBeZeroAddress",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "merkleRoot",
				"type": "bytes32"
			}
		],
		"name": "MerkleRootSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "OwnerCommissionClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "PoolIntakeEnabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			}
		],
		"name": "PoolJoined",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PrizeClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RefundClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "RefundDisabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "RefundEnabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "UnclaimedPrizesWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "newWithdrawAddress",
				"type": "address"
			}
		],
		"name": "WithdrawAddressUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimOwnerCommission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "claimPrize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "canJoinPool",
				"type": "bool"
			}
		],
		"name": "disableRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "enableJoinPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "enableRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCanJoinPool",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCanRefund",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getClaimExpiryTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCommissionClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCommissionPercentage",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentCommission",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEnrollStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayEndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoolPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrizeClaimCount",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrizeMerkleRoot",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRefundClaimCount",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUniqueParticipants",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserPrizeClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserRecorded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserRefundClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWithdrawAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "joinPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "merkleRoot",
				"type": "bytes32"
			}
		],
		"name": "setPrizeMerkleRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "newWithdrawAddress",
				"type": "address"
			}
		],
		"name": "updateWithdrawAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawUnclaimedPrizes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] as const;