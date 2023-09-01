Rails.application.routes.draw do
  resources :users, only: [:create, :update, :show, :destroy]

  post '/login', to: 'session#create'
  delete 'logout', to: 'session#destroy'
  # post 'signup', to: 'users#create'
  
end
