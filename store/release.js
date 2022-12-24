export const state = () => ({
  reviewInFocus: {}
})

export const getters = {
  reviewInFocus: state => state.reviewInFocus
}

export const mutations = {
  setReviewInFocus (st