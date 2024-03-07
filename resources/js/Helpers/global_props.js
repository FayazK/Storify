/**
 * Default pagination configuration for tables or lists.
 * This object defines common pagination parameters and behaviors to ensure a consistent
 * pagination experience across your application.
 */
export const defaultPagination = {
  current: 1, // The current page number.
  defaultCurrent: 1, // The initial page number when the component is mounted.
  size: 'default', // The size of the pagination component, can be 'small' or 'default'.
  pageSize: 25, // Number of items per page.
  hideOnSinglePage: true, // Hides pagination if only one page is present.
  responsive: true, // Adjusts pagination component size based on the container width.
  showSizeChanger: false, // Allows changing the page size.

  /**
   * Function to display the total number of items and the current range of visible items.
   * @param {number} total The total number of items.
   * @param {Array<number>} range The range of items currently displayed.
   * @returns {string} The message displaying the current range and total items.
   */
  showTotal: (
    total, range) => `Showing ${range[0]} to ${range[1]} of ${total} items`,
}

/**
 * Generates an object containing paginated parameters for a table, merging custom parameters
 * with pagination details.
 *
 * @param {Object} params The input parameters object, which may include custom params and pagination details.
 * @returns {Object} An object containing the merged parameters and pagination information.
 */
export const tablePaginatedParams = (params) => ({
  ...params?.params ?? {},
  page: params?.pagination?.current ?? 1,
})

