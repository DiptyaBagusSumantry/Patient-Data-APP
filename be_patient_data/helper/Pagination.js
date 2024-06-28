function paginator(items, page, limit) {
  const offset = (page - 1) * limit;
  const paginatedItems = items.slice(offset).slice(0, limit);
  const total_pages = Math.ceil(items.length / limit);
  return {
    data: paginatedItems,
    totalPages: total_pages,
    currentPages: parseInt(page),
  };
}

module.exports = { paginator };
