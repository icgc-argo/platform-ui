/// <reference types="react" />
import PropTypes from 'prop-types';
export declare const TableActionBar: (props: any) => JSX.Element;
declare function TablePagination(props: any): JSX.Element;
declare namespace TablePagination {
  var propTypes: {
    pages: PropTypes.Validator<number>;
    page: PropTypes.Validator<number>;
    showPageSizeOptions: PropTypes.Requireable<boolean>;
    pageSizeOptions: PropTypes.Requireable<any[]>;
    onPageSizeChange: PropTypes.Requireable<(...args: any[]) => any>;
    onPageChange: PropTypes.Requireable<(...args: any[]) => any>;
  };
}
export default TablePagination;
