import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, FaqItem } from '../data/siteData';

const CATEGORIES: Array<'All' | FaqItem['category']> = [
  'All',
  'Services & Checklists',
  'Scheduling & Policies',
  'Preparation & Home Access',
  'Coverage & Scope',
];

interface FaqAccordionProps {
  limit?: number;
  showCategoryFilter?: boolean;
}

export function FaqAccordion({
  limit,
  showCategoryFilter = true,
}: FaqAccordionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | FaqItem['category']>('All');
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const filtered =
    selectedCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  const visibleItems = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="space-y-6">
      {showCategoryFilter && (
        <div
          role="tablist"
          aria-label="Filter FAQ topics"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstMatch =
                    cat === 'All'
                      ? FAQ_ITEMS[0]
                      : FAQ_ITEMS.find((i) => i.category === cat);
                  if (firstMatch) setOpenId(firstMatch.id);
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#17304B] text-white'
                    : 'bg-white border border-[#E8EFF3] text-[#263845] hover:border-[#4CA8D8] hover:text-[#17304B]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <div className="divide-y divide-[#E8EFF3] border-y border-[#E8EFF3] bg-white rounded-2xl border overflow-hidden">
        {visibleItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="px-5 sm:px-7">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                className="w-full py-5 flex items-start justify-between gap-4 text-left cursor-pointer group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-medium text-[#263845]/70 block">
                    {item.category}
                  </span>
                  <span className="font-display text-base sm:text-lg font-semibold text-[#17304B] group-hover:text-[#4CA8D8] transition-colors block">
                    {item.question}
                  </span>
                </div>
                <span className="mt-1 w-8 h-8 rounded-lg bg-[#FAFCFD] border border-[#E8EFF3] flex items-center justify-center shrink-0 text-[#17304B]">
                  {isOpen ? (
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-panel-${item.id}`}
                  className="pb-6 pr-8 text-sm sm:text-base text-[#263845] leading-relaxed"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
