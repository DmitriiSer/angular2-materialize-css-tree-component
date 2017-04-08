export interface TreeNode {
    title: string;
    isExpanded: boolean;
    children?: Array<TreeNode>;
}