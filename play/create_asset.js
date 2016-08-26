/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('byteballcore/event_bus.js');

function onError(err){
	throw Error(err);
}

function createAsset(){
	var composer = require('byteballcore/composer.js');
	var network = require('byteballcore/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	var asset = {
		cap: (1+2*2+5+10+20*2+50+100)*1000000,
		//cap: 1000000,
		is_private: true,
		is_transferrable: true,
		auto_destroy: false,
		fixed_denominations: true,
		issued_by_definer_only: true,
		cosigned_by_definer: false,
		spender_attested: false,
	//    issue_condition: ["in data feed", [["MO7ZZIU5VXHRZGGHVSZWLWL64IEND5K2"], "timestamp", ">=", 1453139371111]],
	//    transfer_condition: ["has one equal", 
	//        {equal_fields: ["address", "amount"], search_criteria: [{what: "output", asset: "base"}, {what: "output", asset: "this asset"}]}
	//    ],

		denominations: [
			{denomination: 1, count_coins: 1000000},
			{denomination: 2, count_coins: 2000000},
			{denomination: 5, count_coins: 1000000},
			{denomination: 10, count_coins: 1000000},
			{denomination: 20, count_coins: 2000000},
			{denomination: 50, count_coins: 1000000},
			{denomination: 100, count_coins: 1000000}
		],
		//attestors: ["X5ZHWBYBF4TUYS35HU3ROVDQJC772ZMG", "GZSEKMEQVOW2ZAHDZBABRTECDSDFBWVH", "2QLYLKHMUG237QG36Z6AWLVH4KQ4MEY6"].sort()
	};
	composer.composeAssetDefinitionJoint("3VH6WZ4V5AD2U55MQLRQPHRRCYQCFDUI", asset, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createAsset);