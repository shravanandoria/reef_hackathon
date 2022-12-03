// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract ProjectFactory {
    using Counters for Counters.Counter;

    struct ProjectInfo {
        uint256 projectId;
        string projectName;
        string projectDesc;
        uint256 budget;
        bool isComplete;
        string[3] images;
        uint256 date;
        uint256 deadline;
        address payable _owner;
        address payable freelancer;
        uint256 votes;
        Project project;
    }
    
    mapping(uint256 => ProjectInfo) public projects;
    mapping(uint256 => Project) public projectAddresses;
    mapping(address => bool) public hasVoted;
    Counters.Counter private projectCount;
    Project private deployedProject;

    function createProject(
        string memory _projectName,
        string memory _projectDesc,
        string[] memory _images,
        uint256 _deadline
    ) public payable {
        uint256 projectId = projectCount.current();
        require(msg.value > 0, "Please transfer the budget amount");
        Project newProject = Project(payable(msg.sender));
        ProjectInfo memory project = ProjectInfo(
            projectId,
            _projectName,
            _projectDesc,
            address(this).balance,
            false,
            _images,
            block.timestamp,
            _deadline,
            payable(msg.sender),
            payable(address(0)),
            0,
            newProject
        );
        projects[projectId] = project;
        projectAddresses[projectId] = newProject;
        payable(address(newProject)).transfer(address(this).balance);
        projectCount.increment();
    }

    //Get All Deployed Projects
    function getDeployedProjects() public view returns (ProjectInfo[] memory) {
        uint256 projectId = projectCount.current();
        ProjectInfo[] memory items = new ProjectInfo[](projectId);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < projectId; i++) {
            ProjectInfo storage currentItem = projects[i];
            items[currentIndex] = currentItem;
            currentIndex++;
        }

        return items;
    }

    // Get Deployed Proejcts by owner
    function getDeployedProjectByOwner()
        public
        view
        returns (ProjectInfo[] memory)
    {
        uint256 projectId = projectCount.current();
        ProjectInfo[] memory items = new ProjectInfo[](projectId);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < projectId; i++) {
            if (projects[i]._owner == msg.sender) {
                ProjectInfo storage currentItem = projects[i];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function upVote(uint256 _id) public virtual {
        ProjectInfo memory project = projects[_id];
        require(
            msg.sender == project._owner || msg.sender == project.freelancer,
            "You have no role in this project"
        );
        require(!hasVoted[msg.sender], "You have already voted");

        hasVoted[msg.sender] = true;
        project.votes++;
    }
}

contract Project is ProjectFactory {
    using Counters for Counters.Counter;
    Counters.Counter private _proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public isFinalized;
    address payable public owner;

    struct Proposal {
        uint256 cost;
        string summary;
        string[] images;
        address payable _freelance;
        bool proposalAccepted;
    }

    constructor(address payable _owner) {
        owner = _owner;
    }

    // Only Freelancer Owner Can Call This
    //CREATE PROPOSALS
    function createProposal(
        uint256 _cost,
        string memory _summary,
        string[] memory _images
    ) public payable {
        Proposal memory proposal = Proposal(
            _cost,
            _summary,
            _images,
            payable(msg.sender),
            false
        );
        uint256 projectId = _proposalCount.current();
        proposals[projectId] = proposal;
        _proposalCount.increment();
    }

    // Only Project Owner Can Call This
    // APPROVE PROPOSALS
    function approveProposal(uint256 _id, address payable _freelance) private {
        Proposal memory proposal = proposals[_id];
        require(
            !proposal.proposalAccepted,
            "This proposal is aleady been accepted"
        );
        require(msg.sender == owner, "You are not the owner of this Project");
        ProjectFactory.projects[_id].freelancer = _freelance;

        proposal._freelance = _freelance;
        proposal.proposalAccepted = true;
    }

    function finalizeProposal(uint256 _id) public {
        Proposal memory proposal = proposals[_id];
        require(msg.sender == owner || msg.sender == proposal._freelance);
        require(
            !isFinalized[msg.sender],
            "You have already finalized this project"
        );

        isFinalized[msg.sender] = true;
        ProjectFactory.projects[_id].votes++;
        if (ProjectFactory.projects[_id].votes == 2) {
            ProjectFactory.projects[_id].freelancer.transfer(
                address(this).balance
            );
        }
    }

    // GET PROPSALS
    function getProposals() public view returns (Proposal[] memory) {
        uint256 proposalCount = _proposalCount.current();
        Proposal[] memory items = new Proposal[](proposalCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < proposalCount; i++) {
            Proposal storage currentItem = proposals[i];
            items[currentIndex] = currentItem;
            currentIndex++;
        }

        return items;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}