import React from 'react';

const TopOrdersTable = ({
  topProducts,
  Star,
  PencilLine,
  Trash,
}) => {
  if (!topProducts) return null;

  return (
    <div className="card scroll-smooth">
      <div className="card-header">
        <p className="card-title text-lg font-semibold text-slate-700 dark:text-slate-200">Medicine Delivery Stats</p>
      </div>
      <div className="card-body p-0">
        <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
          <table className="table w-full border-collapse border border-slate-200 dark:border-slate-700 text-sm">
            <thead className="table-header bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 sticky top-0 z-10">
              <tr>
                <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700 text-left">#</th>
                <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700 text-left">Medicines</th>
                <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700"> Total amount</th>
                <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Status</th>
                <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Rating</th>
                <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.number} className="table-row border-b border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800">
                  <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700">{product.number}</td>
                  <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700">
                    <div className="flex items-center gap-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold text-slate-900 dark:text-slate-50">{product.name}</p>
                        <p className="text-sm font-normal text-slate-600 dark:text-slate-400">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">₹{product.price}</td>
                  <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">{product.status}</td>
                  <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-center gap-x-1 text-yellow-600">
                      <Star size={18} className="fill-yellow-600 stroke-yellow-600" />
                      {product.rating}
                    </div>
                  </td>
                  <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-center gap-x-4">
                      
                      <button className="text-red-500" aria-label="Delete product">
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopOrdersTable;
