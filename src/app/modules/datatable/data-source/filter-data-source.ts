import { MdtTableDataSource, TableFilter } from 'material-dynamic-table';

export class FilteredDataSource<T> extends MdtTableDataSource<T> {

    /**
     * Filter predicate that will use _filters to filter.
     * This is a workaround as filterPredicate interface only allows filter to be a string.
     */
    filterPredicate = (data: T): boolean => {
        if (!this.filters || !this.filters.length) {
            return true;
        }

        const result = this.filters.reduce((visible, tableFilter) => {
            if (!visible) {
                return visible;
            }

            const filter = tableFilter.getFilter();

            return Object.keys(filter).reduce((show, columnName) => {
                if (!show) {
                    return show;
                }
                return true;
            }, true);
        }, true);

        return result;
    }

    private matchesFilter(filterForColumn: any, dataForColumn: any): boolean {

        if (filterForColumn.contains && dataForColumn.indexOf(filterForColumn.contains) !== -1) {
            return true;
        }

        if (filterForColumn.le && filterForColumn.ge) {
            if (dataForColumn.getTime() >= filterForColumn.ge.getTime() && dataForColumn.getTime() <= filterForColumn.le.getTime()) {
                return true;
            }
        } else if (filterForColumn.ge && dataForColumn.getTime() >= filterForColumn.ge.getTime()) {
            return true;
        } else if (filterForColumn.le && dataForColumn.getTime() <= filterForColumn.le.getTime()) {
            return true;
        }

        return false;
    }
}