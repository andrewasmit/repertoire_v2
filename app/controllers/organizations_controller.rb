class OrganizationsController < ApplicationController
  attr_accessor :org
  before_action :authorize_user_crud, only: [:show, :update, :delete]

  def create
    org = Organization.create!(organization_params)
    render json: org, status: :created
  end

  def show
    render json: @org, status: :ok 
  end

  def update
    @org.update!(organization_params)
    render json: @org, status: :ok
  end

  def destroy
    @org.destroy
    head :no_content
  end

  def concert_programs
    concert_programs = []
    concerts = @org.concerts

    for concert in concerts
      program = []
      performances = concert.performances
      
      for performance in performances
        piece = Piece.find(performance.piece_id)
        ensemble = Ensemble.find(performance.ensemble_id)
        # concert = Concert.find(performance.concert_id) // Can we save this query and just use the info from the above scope?

        program << { 
          piece: piece.title, 
          ensemble: ensemble.name, 
          performance: performance.id, 
          concert: concert.id 
        }  
      end
      return program 
    end
    return json: concert_programs
  end

  private
  def organization_params
    params.permit(:name, :id)
  end

  def authorize_user_crud
    @org = Organization.find(params[:id])
    user = User.find(session[:user_id])
    return render json: { error: 'You are not authorized to view or make edits to organizaitons you are not associated with or an Administrator of.' }, status: :unauthorized unless user.organization_id == @org.id && user.is_admin
  end

end
