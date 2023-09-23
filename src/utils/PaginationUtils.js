function pagination(data, page, limit) {
    const startIndex = page * limit;
    const endIndex = (page + 1) * limit;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / limit);

    const paginatedResults = data.slice(startIndex, endIndex);

    return {
        paginatedResults,
        totalItems,
        totalPages,
    };
}

export default pagination;
