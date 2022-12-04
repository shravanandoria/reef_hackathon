// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract ProjectFacroty {

    using Counters for Counters.Counter;
    Counters.Counter public projectCount;
    mapping(uint256 => ProjectInfo) public projects;

    struct ProjectInfo {
        uint256 projectId;
        string projectTitle;
        string projectDesc;
        uint256 budget;
        bool isComplete;
        uint256 date;
        uint256 deadline;
        address payable _owner;
        address payable freelancer;
        Project project;
    }

    function createProject(
        string memory _title,
        string memory _desc,
        uint256 _budget,
        uint256 _deadline
    ) public payable returns (ProjectInfo) {
        require(msg.value > 0, "transfer more than 0 tokens");
        uint256 projectId = projectCount.current();
        Project  newProject = new Project(payable(msg.sender));
        ProjectInfo memory project = ProjectInfo(
            projectId,
            _title,
            _desc,
            _budget,
            false,
            block.timestamp,
            _deadline,
            payable(msg.sender),
            payable(address(0)),
            newProject
        );

        payable(address(newProject)).transfer(address(this).balance);
        projects[projectId] = project;
        projectCount.increment();
        return project;
    }

    function getDeployedProjects() public view returns (ProjectInfo[] memory) {
        uint256 projectCount = projectCount.current();
        ProjectInfo[] memory items = new ProjectInfo[](projectCount);
        uint256 currentIndex = 0;

        for(uint256 i = 0; i < projectCount; i++){
            ProjectInfo storage currentItem = projects[i];
            items[currentIndex] = currentItem;
            currentIndex++;
        }
        return items;
    }

    function deployedProjectsByOwner() public view returns (ProjectInfo[] memory) {
        uint256 projectCount = projectCount.current();
        ProjectInfo[] memory items = new ProjectInfo[](projectCount);
        uint256 currentIndex = 0;

        for(uint256 i = 0; i < projectCount; i++) {
            if(projects[i]._owner == msg.sender){
                ProjectInfo storage currentItem = projects[i];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }


}

contract Project {

    using Counters for Counters.Counter;
    Counters.Counter public proposalCount;
    mapping(uint256 => ProposalInfo) public proposals;
    bool public isProjectOccupied = false;

    struct ProposalInfo {
        uint256 proposalId;
        uint256 cost;
        string summary;
        address payable freelance;
        bool isProposalAccepted;
        bool isProposalCompleted;
    }

    address payable owner;

    constructor(address payable _owner) {
        owner = _owner;
    }

    function createProposal(uint256 _cost, string memory _summary) public {
        uint256 proposalId = proposalCount.current();
        
        ProposalInfo memory proposal = ProposalInfo(
            proposalId,
            _cost,
            _summary,
            payable(msg.sender),
            false,
            false
        );

        proposals[proposalId] = proposal;
        proposalCount.increment();
    }

    function approveProposal (uint256 _id) public {
        require(msg.sender == owner, "You are not the owner of this project");
        ProposalInfo storage proposal = proposals[_id];
        proposal.isProposalAccepted = true;
        isProjectOccupied = true;
    }

    function finalizeProject(uint256 _id) public payable {
        require(msg.sender == owner, "You are not the owner of this project");
        ProposalInfo memory proposal = proposals[_id];

        uint256 balance = address(this).balance - proposal.cost ;
        if(balance > 0){
            owner.transfer(balance);
        }
        proposal.freelance.transfer(proposal.cost);
        proposal.isProposalCompleted = true;
    }

    function getProposals() public view returns (ProposalInfo[] memory) {
        uint256 proposalId = proposalCount.current();
        ProposalInfo[] memory items = new ProposalInfo[](proposalId);
        uint256 currentIndex = 0;

        for(uint256 i = 0; i < proposalId; i++){
            ProposalInfo storage currentItem = proposals[i];
            items[currentIndex] = currentItem;
            currentIndex++;
        }
        return items;
    }

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }

    receive() external payable {}
}