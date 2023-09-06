Rails.application.routes.draw do
  resources :users, only: [:create, :show, :update, :destroy]
  resources :organizations, only: [:create, :show, :update, :destroy]
  resources :notes, only: [:create, :show, :update, :destroy]
  resources :ensembles, only: [:create, :show, :update, :destroy]
  resources :pieces, only: [:create, :show, :update, :destroy]
  resources :performances, only: [:create, :destroy]
  resources :concerts, only: [:create, :show, :update, :destroy]

  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#fetch_profile'
  get '/concerts/:id/details', to: 'concerts#show_concert_details'
  
end
