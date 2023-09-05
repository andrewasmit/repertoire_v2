Rails.application.routes.draw do
  resources :users, only: [:create, :show, :update, :destroy]
  resources :organizations, only: [:create, :show, :update, :destroy]
  resources :notes, only: [:create, :show, :update, :destroy]
  resources :ensembles, only: [:create, :show, :update, :destroy]
  resources :pieces, only: [:create, :show, :update, :destroy]

  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'
  post '/signup', to: 'user#create'
  
end
