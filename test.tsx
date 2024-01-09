import Icon from '$store/components/ui/Icon.tsx'
import { ProductListingPage } from 'apps/commerce/types.ts'

export interface Props {
	pageInfo: ProductListingPage['pageInfo']
	class?: string
	center?: boolean
}

class Ellipsis {}

/**
 * @island
 */
export function ImAnIsland() {
    console.log('FOooooooooooooooooooooooooooooooooooooo')
    
	return null
}

/**
 * @island
 */
export function VaiPapi() {
	console.log('papiiiiiiiiiiiiiiiiiiiiiiiiiii')

	return null
}

function Pagination({ pageInfo, class: _class = '', center }: Props) {
	const totalPages = Math.floor(pageInfo.records! / pageInfo.recordPerPage!)
	const maxPageNumbers = 4
	const allPages = Array(totalPages + 1).fill(0).map((_, i) => i + 1)

	let paginations = [] as (number | Ellipsis)[]

	const currentPageIndex = pageInfo.currentPage - 1
	const lastPageIndex = currentPageIndex + maxPageNumbers - 1

	if (totalPages - pageInfo.currentPage <= maxPageNumbers) {
		// [6, 7, 8, 9, 10]
		paginations = allPages.slice(totalPages - maxPageNumbers)
	} else {
		// [1, 2, 3, 4, ..., 10]
		paginations = [
			...allPages.slice(currentPageIndex, lastPageIndex),
			Ellipsis,
			allPages.at(-1)!,
		]
	}

	return (
		<div
			class={`flex items-center text-black ${_class} ${
				center ? 'justify-center' : 'justify-center lg:justify-end'
			}`}
		>
            <ImAnIsland />
            <VaiPapi />
			{pageInfo.previousPage && (
				<a
					aria-label='previous page link'
					rel='prev'
					href={pageInfo.previousPage ?? '#'}
					class='flex items-center justify-center gap-x-1 md:gap-x-5 text-sm font-light text-_neutral-500'
				>
					<span class='transition-colors hover:bg-primary-500 w-11 h-11 group cursor-pointer duration-300 grid place-items-center'>
						<Icon
							size={16}
							id='ChevronDown'
							strokeWidth={3}
							class='group-hover:text-white transition-colors rotate-90'
						/>
					</span>
					Anterior
				</a>
			)}
			<div class='flex items-center mx-2'>
				{paginations.map((i) => (
					i === Ellipsis ? <span class='text-primary-500'>...</span> : (
						<a
							aria-label={`page ${i}`}
							href={`?page=${i}`}
							data-current={pageInfo.currentPage === i}
							class='data-[current=true]:text-primary-500 data-[current=true]:font-bold data-[current=true]:text-lg text-sm font-light text-_neutral-500 px-2'
						>
							{i}
						</a>
					)
				))}
			</div>
			{pageInfo.nextPage && (
				<a
					aria-label='next page link'
					rel='next'
					href={pageInfo.nextPage ?? '#'}
					class='flex items-center justify-center gap-x-1 md:gap-x-5 text-sm font-light text-_neutral-500'
				>
					Próximo
					<span class='transition-colors hover:bg-primary-500 w-11 h-11 group cursor-pointer duration-300 grid place-items-center'>
						<Icon
							size={16}
							id='ChevronDown'
							strokeWidth={3}
							class='group-hover:text-white transition-colors -rotate-90'
						/>
					</span>
				</a>
			)}
		</div>
	)
}

export default Pagination
