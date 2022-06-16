/// <reference types="react" />
declare const ViewAmountController: React.ComponentType<{
  /** Function to handle what happens when the selectAll/DeselectAll button is clicked */
  selectAllHander: () => any;
  /** Function to handle what happens when more/less toggle is clicked */
  moreToggleHandler: () => any;
  /** if select all option is visible */
  selectAllVisible?: boolean;
  /** whether or not selectAll has been triggered */
  selectAllState: boolean;
  /** whether or not there are more hidden options available to view */
  moreOptionsAvailable: boolean;
  /** what to set the visibility property of, for the more/less toggle  */
  toggleVisiblityCss?: string;
  /** the text for the more/less toggle  */
  toggleText?: string;
}>;
export default ViewAmountController;
