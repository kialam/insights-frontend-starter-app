import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Toolbar,
    ToolbarContent as PFToolbarContent,
    ToolbarToggleGroup,
    ToolbarGroup as PFToolbarGroup,
    Button
} from '@patternfly/react-core';
import { FilterIcon, SortAmountDownIcon } from '@patternfly/react-icons';

import CategoryDropdown from './CategoryDropdown';
import CustomDateSelector from './CustomDateSelector';
import { optionsForCategories } from './constants';
import ToolbarFilterItem from './ToolbarFilterItem';

const ToolbarGroup = styled(PFToolbarGroup)`
  button {
    .pf-c-select__toggle-wrapper {
      flex-wrap: nowrap;
    }
  }
`;

const ToolbarContent = styled(PFToolbarContent)`
  .pf-c-toolbar__content-section {
    justify-content: space-between;
  }
`;

const FilterableToolbar = ({
    categories,
    filters,
    setFilters
}) => {
    const [ currentCategory, setCurrentCategory ] = useState(
        Object.keys(categories)[0]
    );

    const { quickDateRange, sortBy, ...filterCategories } = categories;

    const onInputChange = (type, value) => {
        setFilters(type, value);
    };

    const FilterCategoriesGroup = () => (
        <ToolbarGroup variant="filter-group">
            <CategoryDropdown
                selected={ currentCategory }
                setSelected={ setCurrentCategory }
                categories={
                    Object.keys(filterCategories).map(el => ({
                        key: el,
                        name: optionsForCategories[el].name
                    }))
                }
            />
            { Object.keys(filterCategories).map(key =>
                <ToolbarFilterItem
                    key={ key }
                    categoryKey={ key }
                    filter={ filters[key] }
                    values={ categories[key] }
                    visible={ currentCategory === key }
                    setFilter={ value => setFilters(key, value) }
                />
            ) }
        </ToolbarGroup>
    );

    const QuickDateGroup = () => (
        <ToolbarGroup variant="filter-group">
            <ToolbarFilterItem
                categoryKey='quickDateRange'
                filter={ filters.quickDateRange }
                values={ quickDateRange }
                setFilter={ value => setFilters('quickDateRange', value) }
            />
            { filters.quickDateRange === 'custom' && (
                <CustomDateSelector
                    startDate={ filters.startDate }
                    endDate={ filters.endDate }
                    onInputChange={ onInputChange }
                />
            ) }
        </ToolbarGroup>
    );

    const SortByGroup = () => (
        <ToolbarGroup variant="filter-group">
            <ToolbarFilterItem
                categoryKey='sortBy'
                filter={ filters.sortBy }
                values={ sortBy }
                setFilter={ value => setFilters('sortBy', value) }
            />
            <Button variant="control">
                <SortAmountDownIcon />
            </Button>
        </ToolbarGroup>
    );

    return (
        <Toolbar
            id="filterable-toolbar-with-chip-groups"
            clearAllFilters={ () => { setFilters(null, null); } }
            collapseListedFiltersBreakpoint="xl"
        >
            <ToolbarContent>
                <ToolbarToggleGroup toggleIcon={ <FilterIcon /> } breakpoint="xl">
                    { Object.keys(filterCategories).length > 0 && <FilterCategoriesGroup /> }
                    { quickDateRange && <QuickDateGroup /> }
                    { sortBy && <SortByGroup /> }
                </ToolbarToggleGroup>
            </ToolbarContent>
        </Toolbar>
    );
};

FilterableToolbar.propTypes = {
    categories: PropTypes.object,
    filters: PropTypes.object,
    setFilters: PropTypes.func
};

export default FilterableToolbar;
