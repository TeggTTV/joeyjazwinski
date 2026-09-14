export interface GitScenario {
	id: string;
	title: string;
	category: 'Undo & Recovery' | 'Branching & Stash' | 'Rebase & History' | 'Submodules & Worktrees' | 'Bisect & Debug';
	cmd: string;
	desc: string;
	warning?: string;
	params: Array<{
		key: string;
		label: string;
		placeholder: string;
		defaultValue: string;
	}>;
	graphType: 'undo_soft' | 'undo_hard' | 'branch_create' | 'rebase' | 'worktree' | 'submodule' | 'cherry_pick';
}

export const GIT_SCENARIOS: GitScenario[] = [
	{
		id: 'undo-soft',
		title: 'Undo last commit (keep files staged)',
		category: 'Undo & Recovery',
		cmd: 'git reset --soft HEAD~<N>',
		desc: 'Moves HEAD back N commits while keeping all changed files modified and in the staging area.',
		params: [
			{ key: '<N>', label: 'Number of Commits (N)', placeholder: '1', defaultValue: '1' },
		],
		graphType: 'undo_soft',
	},
	{
		id: 'undo-hard',
		title: 'Undo last commit (permanently discard changes)',
		category: 'Undo & Recovery',
		cmd: 'git reset --hard HEAD~<N>',
		desc: 'Permanently rolls back your working tree and index by N commits.',
		warning: 'Destructive operation: uncommitted file modifications will be erased.',
		params: [
			{ key: '<N>', label: 'Number of Commits (N)', placeholder: '1', defaultValue: '1' },
		],
		graphType: 'undo_hard',
	},
	{
		id: 'revert-commit',
		title: 'Safely revert public commit',
		category: 'Undo & Recovery',
		cmd: 'git revert <commit-hash>',
		desc: 'Creates a new commit that inverts the changes of an existing commit without altering Git history.',
		params: [
			{ key: '<commit-hash>', label: 'Commit SHA Hash', placeholder: 'a1b2c3d', defaultValue: 'HEAD' },
		],
		graphType: 'undo_soft',
	},
	{
		id: 'discard-file',
		title: 'Discard local changes to specific file',
		category: 'Undo & Recovery',
		cmd: 'git restore <file-path>',
		desc: 'Reverts uncommitted local modifications to a file back to the state of the last commit.',
		params: [
			{ key: '<file-path>', label: 'File Path', placeholder: 'src/app.tsx', defaultValue: 'src/index.ts' },
		],
		graphType: 'undo_soft',
	},
	{
		id: 'rename-branch',
		title: 'Rename current branch',
		category: 'Branching & Stash',
		cmd: 'git branch -m <new-name>',
		desc: 'Renames the branch you currently have checked out.',
		params: [
			{ key: '<new-name>', label: 'New Branch Name', placeholder: 'feature/new-checkout', defaultValue: 'feature/login' },
		],
		graphType: 'branch_create',
	},
	{
		id: 'new-branch-checkout',
		title: 'Create & switch to new branch',
		category: 'Branching & Stash',
		cmd: 'git switch -c <branch-name>',
		desc: 'Creates a new branch pointing to current HEAD and switches your working directory to it.',
		params: [
			{ key: '<branch-name>', label: 'Branch Name', placeholder: 'feature/dark-mode', defaultValue: 'feature/dark-mode' },
		],
		graphType: 'branch_create',
	},
	{
		id: 'stash-include-untracked',
		title: 'Stash changes including untracked files',
		category: 'Branching & Stash',
		cmd: 'git stash push -u -m "<stash-message>"',
		desc: 'Saves your dirty working state, including newly created untracked files, to the stash stack.',
		params: [
			{ key: '<stash-message>', label: 'Stash Note', placeholder: 'WIP on navbar', defaultValue: 'WIP before pull' },
		],
		graphType: 'branch_create',
	},
	{
		id: 'rebase-interactive',
		title: 'Interactive rebase (squash / edit commits)',
		category: 'Rebase & History',
		cmd: 'git rebase -i HEAD~<N>',
		desc: 'Opens an editor to reorder, squash (combine), reword, or drop the last N commits.',
		params: [
			{ key: '<N>', label: 'Number of Commits to Inspect (N)', placeholder: '3', defaultValue: '3' },
		],
		graphType: 'rebase',
	},
	{
		id: 'amend-commit',
		title: 'Amend staged files into previous commit',
		category: 'Rebase & History',
		cmd: 'git commit --amend --no-edit',
		desc: 'Adds your staged files directly into the last commit without changing its commit message.',
		params: [],
		graphType: 'rebase',
	},
	{
		id: 'cherry-pick',
		title: 'Cherry-pick commit into active branch',
		category: 'Rebase & History',
		cmd: 'git cherry-pick <commit-hash>',
		desc: 'Applies the changes introduced by a specific commit from another branch into your current branch.',
		params: [
			{ key: '<commit-hash>', label: 'Target Commit SHA', placeholder: 'e7f8g9h', defaultValue: 'abc1234' },
		],
		graphType: 'cherry_pick',
	},
	{
		id: 'worktree-add',
		title: 'Create separate worktree directory',
		category: 'Submodules & Worktrees',
		cmd: 'git worktree add <worktree-path> <branch-name>',
		desc: 'Checks out a branch in a separate filesystem folder so you can test or review code without stashing or switching branches.',
		params: [
			{ key: '<worktree-path>', label: 'Worktree Directory Path', placeholder: '../hotfix-dir', defaultValue: '../hotfix' },
			{ key: '<branch-name>', label: 'Branch Name', placeholder: 'hotfix/patch-1', defaultValue: 'hotfix/quick-fix' },
		],
		graphType: 'worktree',
	},
	{
		id: 'worktree-remove',
		title: 'Remove worktree and clean references',
		category: 'Submodules & Worktrees',
		cmd: 'git worktree remove <worktree-path>',
		desc: 'Deletes a linked working tree and cleans up administrative files in .git/worktrees.',
		params: [
			{ key: '<worktree-path>', label: 'Worktree Directory Path', placeholder: '../hotfix-dir', defaultValue: '../hotfix' },
		],
		graphType: 'worktree',
	},
	{
		id: 'submodule-add',
		title: 'Add external Git submodule',
		category: 'Submodules & Worktrees',
		cmd: 'git submodule add <repo-url> <submodule-path>',
		desc: 'Clones another Git repository as a subdirectory inside your repository and records the pinned commit in .gitmodules.',
		params: [
			{ key: '<repo-url>', label: 'Submodule Repository URL', placeholder: 'https://github.com/user/lib.git', defaultValue: 'https://github.com/example/ui-kit.git' },
			{ key: '<submodule-path>', label: 'Target Subfolder', placeholder: 'libs/ui-kit', defaultValue: 'packages/ui-kit' },
		],
		graphType: 'submodule',
	},
	{
		id: 'submodule-update',
		title: 'Recursively clone and update submodules',
		category: 'Submodules & Worktrees',
		cmd: 'git submodule update --init --recursive',
		desc: 'Initializes missing submodule configurations and checks out the appropriate nested commits recursively.',
		params: [],
		graphType: 'submodule',
	},
	{
		id: 'bisect-start',
		title: 'Start binary search bug hunt (Bisect)',
		category: 'Bisect & Debug',
		cmd: 'git bisect start && git bisect bad && git bisect good <known-good-commit>',
		desc: 'Initializes Git binary search to automatically pinpoint the exact commit that introduced a bug.',
		params: [
			{ key: '<known-good-commit>', label: 'Known Good Commit/Tag', placeholder: 'v1.0.0 or a1b2c3d', defaultValue: 'v1.0.0' },
		],
		graphType: 'rebase',
	},
];
