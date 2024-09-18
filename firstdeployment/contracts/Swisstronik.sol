// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract Swisstronik{
      address  owner;
  struct Campaign{
    string title;
    string description;
    address benefactor;
    uint goal;
    uint deadline;
    uint amountRaised;
   }

   event campaignCreated(string title, string description, uint goal, uint deadline);
   event donated(uint amountdonated);
   event campaignEnded(uint campaignEnded);

constructor(){
  owner= msg.sender;

}

modifier IsOwner(){
  require(owner==msg.sender, 'Only address owner');
  _;
}

Campaign[] public _campaignList;
  uint campaignId;
   mapping(uint=> Campaign) public campaign;

function createCampaign(string memory title, string memory description,uint goal, uint deadline ) external  {
  require(goal>0, "You can't donate 0value");
  Campaign storage Newcampaign = campaign[campaignId];
  // require(deadline>0,"The dealine should not be now");
 Newcampaign.title=title;
 Newcampaign.description=description;
  Newcampaign.goal=goal;
  Newcampaign.deadline=block.timestamp+deadline;
  Newcampaign.benefactor= msg.sender;
  Newcampaign.amountRaised=0;
_campaignList.push(campaign[campaignId]);
emit campaignCreated(title, description, goal, deadline);
campaignId++;
}

function donateToCampaign(uint _campaignId ) external payable {
require(_campaignId<campaignId, "Invalid Id");
Campaign storage donateTo = campaign[_campaignId];
  require(block.timestamp<donateTo.deadline, "This campaing has ended!!");
donateTo.amountRaised += msg.value;
  require(donateTo.amountRaised>0, "The fund must be greater than 0");

emit donated(donateTo.amountRaised);
}

function endCampaign(uint _campaignId) external payable IsOwner {
  Campaign storage endcampaign = campaign[_campaignId];
  require(_campaignId<campaignId,"Camapaign does not exist");
  require(block.timestamp>=endcampaign.deadline, "You can't donate!");
  payable(endcampaign.benefactor).transfer(endcampaign.amountRaised);

emit campaignEnded(_campaignId);
endcampaign.amountRaised=0;
}

    }

