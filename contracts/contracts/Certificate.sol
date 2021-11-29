pragma solidity >=0.4.23 <0.6.0;

import "./TheFundingNetwork.sol";

contract Certificate is TheFundingNetwork {

    constructor() TheFundingNetwork("Certificate", "TFN") public {
    }


}