Rails.application.routes.draw do
  resources :users, only: [:create, :show, :update, :destroy]
  resources :organizations, only: [:create, :show, :update, :destroy]

  post '/signin', to: 'session#create'
  delete '/signout', to: 'session#destroy'
  post '/signup', to: 'user#create'
  
end
